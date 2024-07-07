<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <BasicForm
      v-bind="getFormProps"
      v-if="getProps.useSearchForm"
      :tableAction="tableMethods"
      @register="registerForm"
      @advanced-change="redoHeight"
      @submit="handleSearchSubmit">
      <template #[replaceFormSlotKey(item)]="data" v-for="item in getFormSlotKeys">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </BasicForm>
    <TableHeader v-if="getHeaderProps" v-bind="getHeaderProps">
      <template #toolbar v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </template>
      <template #title v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template #headerTop v-if="$slots.headerTop">
        <slot name="headerTop"></slot>
      </template>
      <template #headerBottom v-if="$slots.headerBottom">
        <slot name="headerBottom"></slot>
      </template>
    </TableHeader>
    <ElTable ref="tableElRef" v-bind="getBindValues" v-loading="getLoading">
      <template v-for="column in columns" :key="column.prop">
        <template v-if="column.customRender">
          <ElTableColumn v-bind="column" :customRender="null">
            <template #default="scope">
              <TableRender :customRender="column.customRender" :scope="scope" :column="column" />
            </template>
          </ElTableColumn>
        </template>
        <template v-else-if="column.type === 'action'">
          <ElTableColumn v-bind="column">
            <template #default="scope">
              <TableAction :prefixCls="`${prefixCls}-action`" :column="column" :scopes="scope" />
            </template>
          </ElTableColumn>
        </template>
        <template v-else-if="column.isSlot">
          <slot :name="column.prop" v-bind="column"></slot>
        </template>

        <ElTableColumn v-bind="column" v-else />
      </template>
    </ElTable>
    <TablePagination
      v-if="getPaginationProps !== false"
      :prefixCls="`${prefixCls}-pagination`"
      v-bind="getPaginationProps"
      @page-change="handlePageChange"
      @size-change="handlePageSizeChange" />
  </div>
</template>

<script lang="ts">
import type { ElePagination, EleTable } from '@/components/ElementPlus'
import type { BasicTableProps, TableActionMethods } from './typing'

import { defineComponent, ref, computed, unref, watchEffect, inject } from 'vue'
import { ElLoading, ElTable, ElTableColumn } from 'element-plus'
import { omit } from 'lodash-es'

import { BasicForm, useForm } from '@/components/BasicForm'
import { PageWrapperFixedHeightKey } from '@/components/PageWrapper'
import { useDesign } from '@/hooks/web/useDesign'
import { warn } from '@/utils/log'

import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'
import { useDataSource } from './hooks/useDataSource'
import { useLoading } from './hooks/useLoading'
import { useTableScroll } from './hooks/useTableScroll'
import { useTableExpand } from './hooks/useTableExpand'
import { createTableContext } from './hooks/useTableContext'
import { useTableForm } from './hooks/useTableForm'
import TableHeader from './components/TableHeader.vue'
import TableRender from './components/TableRender'
import TablePagination from './components/TablePagination.vue'
import TableAction from './components/TableAction.vue'
import { useBasicTableFn } from './hooks/useBasic'
import { basicProps, customProps, ElTableBasicEmits } from './props'

export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    BasicForm,
    TableHeader,
    TableRender,
    TablePagination,
    TableAction,
  },
  directives: {
    loading: ElLoading.directive,
  },
  props: basicProps,
  emits: [...ElTableBasicEmits, 'fetch-success', 'fetch-error', 'register', 'pagination'],

  setup(props, { attrs, emit, slots, expose }) {
    const tableElRef = ref()
    const tableData = ref<Recordable[]>([])

    const wrapRef = ref(null)
    const propsRef = ref<Partial<BasicTableProps>>({})

    const { prefixCls } = useDesign('basic-table')

    const isFixedHeightPage = inject(PageWrapperFixedHeightKey, false)

    /**
     * 获取 Props
     *
     * Get props
     */
    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) } as BasicTableProps
    })

    const { getLoading, setLoading } = useLoading(getProps)

    const { getTablePagination, getPagination, setPagination } = usePagination(getProps)

    const [registerForm, formActions] = useForm({
      submitAfterReset: true,
      alwaysShowLines: 1,
    })

    const {
      handleTableChange,
      getDataSourceRef,
      getDataSource,
      getRawDataSource,
      setTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      fetch,
      getRowKey,
      reload,
      updateTableData,
    } = useDataSource(getProps, tableData, getTablePagination, setPagination, setLoading, formActions.getFieldsValue, emit)

    const { getBasicEmits, clearSelection, getSelectionRows, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort } =
      useBasicTableFn(tableElRef, handleTableChange, emit)

    const { getViewColumns, getColumns, setColumns, getCacheColumns } = useColumns(getProps, getTablePagination)

    const { redoHeight } = useTableScroll(getProps, tableElRef, getDataSourceRef)

    const { getExpandOptions, expandAll, collapseAll } = useTableExpand(getProps, getDataSourceRef, getRowKey)

    const { getFormProps, replaceFormSlotKey, getFormSlotKeys, handleSearchSubmit } = useTableForm(getProps, slots, fetch, getLoading)

    /**
     * 获取头部 Props
     *
     * Get header props
     */
    const getHeaderProps = computed(() => {
      const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(getProps)

      const hideTitle = !slots.title && !title && !slots.toolbar && !showTableSetting
      if (hideTitle) {
        return {}
      }

      if (typeof title !== 'string') {
        warn('Table title must be a string')
      }

      return {
        title,
        prefixCls: `${prefixCls}-header`,
        showTableSetting,
        tableSetting,
        titleHelpMessage,
      }
    })

    /**
     * 获取分页 Props
     *
     * Get pagination props
     */
    const getPaginationProps = computed((): ElePagination | boolean => {
      return unref(getTablePagination)
    })

    /**
     * 绑定表格Props
     *
     * Bind table props
     */
    const getBindValues = computed(() => {
      const opts = {
        ...attrs,
        ...getBasicEmits,
        ...unref(getProps),
        rowKey: unref(getRowKey),
        data: unref(getDataSourceRef),
        ...unref(getExpandOptions),
      }
      // 绑定组件Porps前，移除自定义附加项
      // Before binding component Porps, remove custom add-ons
      const customOpts = Object.keys(customProps)

      return omit(opts, customOpts) as EleTable
    })
    /**
     * 获取表格外框类
     *
     * Get wrapper class
     */
    const getWrapperClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--full`]: unref(getProps).canResize,
          [`is-shadow`]: unref(getProps).isShadow,
        },
      ]
    })

    /**
     * 通过实例设置 Props
     *
     * Setting Props by Instance
     * @param tableProps Table Props
     */
    function setTableProps(tableProps: Partial<BasicTableProps>): void {
      propsRef.value = { ...(unref(propsRef) as Recordable), ...tableProps } as Recordable
    }

    /**
     * 处理分页页码变化
     *
     * Handling pagination page changes
     */
    function handlePageChange(currentPage: number) {
      const opts = unref(getTablePagination)

      emit('pagination', {
        ...opts,
        currentPage: (opts.currentPage || 0) + currentPage,
      })
      handleTableChange({ currentPage })
    }

    /**
     * 处理分页大小变化
     *
     * Handling pagination size changes
     */
    function handlePageSizeChange(pageSize: number) {
      const opts = unref(getTablePagination)
      emit('pagination', {
        ...opts,
        pageSize: (opts.pageSize || 0) + pageSize,
      })
      handleTableChange({ pageSize })
    }

    const tableMethods: TableActionMethods = {
      // Advanced
      reload,
      setTableProps,
      getColumns,
      setColumns,
      getCacheColumns,
      setLoading,
      getDataSource,
      getRawDataSource,
      setTableData,
      updateTableData,
      updateTableDataRecord,
      deleteTableDataRecord,
      insertTableDataRecord,
      findTableDataRecord,
      redoHeight,
      setPagination,
      getPagination,
      expandAll,
      collapseAll,
      emit,
      // Element Plus
      clearSelection,
      getSelectionRows,
      toggleRowSelection,
      toggleAllSelection,
      toggleRowExpansion,
      setCurrentRow,
      clearSort,
      clearFilter,
      doLayout,
      sort,
    }
    createTableContext({ ...tableMethods, wrapRef, getBindValues })

    expose(tableMethods)

    emit('register', tableMethods, formActions)

    watchEffect(() => {
      unref(isFixedHeightPage) && props.canResize && warn("'canResize' of BasicTable may not work in PageWrapper with 'contentFullHeight' (especially in hot updates)")
    })

    return {
      prefixCls,
      tableElRef,
      getProps,
      getBindValues,
      getLoading,
      registerForm,
      handleSearchSubmit,
      handlePageChange,
      handlePageSizeChange,
      wrapRef,
      tableMethods,
      redoHeight,
      getHeaderProps,
      getPaginationProps,
      getFormProps,
      replaceFormSlotKey,
      getFormSlotKeys,
      getWrapperClass,
      columns: getViewColumns,
    }
  },
})
</script>

<style lang="scss">
$prefix-cls: '#{$tonyname}-basic-table';

.#{$prefix-cls} {
  max-width: 100%;
  padding: 32px 24px 16px;
  background: var(--background-primary-color);

  &.is-shadow {
    box-shadow: var(--card-shadow);
  }

  &-header {
    &__top {
      margin-bottom: 12px;
    }

    &__bottom {
      margin-top: 12px;
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    &__toolbar {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      > * {
        margin-right: 8px;
      }

      &-setting {
        display: flex;
        align-items: center;

        > * {
          margin-right: 12px;
          cursor: pointer;
        }

        svg {
          width: 1.3em;
          height: 1.3em;
        }
      }
    }
  }

  &--full {
    height: 100%;
  }

  &-action {
    display: flex;
    align-items: center;

    &.left {
      justify-content: flex-start;
    }

    &.center {
      justify-content: center;
    }

    &.right {
      justify-content: flex-end;
    }

    .el-button {
      display: flex;
      align-items: center;

      .eleicon {
        margin-right: 4px;
      }

      + .el-button {
        margin-left: 12px;
      }
    }
  }

  &-pagination {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem 0;

    &--align {
      &-left {
        justify-content: left;
      }

      &-center {
        justify-content: center;
      }

      &-right {
        justify-content: right;
      }
    }
  }

  .tony-basic-form-submit-btns > .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
