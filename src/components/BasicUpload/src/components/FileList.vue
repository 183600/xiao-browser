<script lang="tsx">
import type { FileBasicColumn } from '../typing'

import { defineComponent, CSSProperties, watch, nextTick } from 'vue'

import { useModalContext } from '@/components/BasicModal'

export default defineComponent({
  name: 'FileList',
  props: {
    /**
     * 文件列
     *
     * File table column
     */
    columns: {
      type: Array as PropType<FileBasicColumn[]>,
      default: null,
    },
    /**
     * 文件操作列
     *
     * File table action column
     */
    actionColumn: {
      type: Object as PropType<FileBasicColumn>,
      default: null,
    },
    /**
     * 文件数据
     *
     *  File table data
     */
    dataSource: {
      type: Array as PropType<any[]>,
      default: null,
    },
  },
  setup(props) {
    const modalFn = useModalContext()

    watch(
      () => props.dataSource,
      () => {
        nextTick(() => {
          modalFn?.redoModalHeight?.()
        })
      },
    )

    return () => {
      const { columns, actionColumn, dataSource } = props
      const columnList = [...columns, actionColumn]
      let bodyContent: JSX.Element | JSX.Element[] | null = null

      if (dataSource?.length) {
        bodyContent = dataSource.map((record = {}, index) => {
          return (
            <tr key={`${index + record.name || ''}`}>
              {columnList.map((item) => {
                const { prop = '', customRender, align = 'center' } = item
                const render = typeof customRender === 'function'
                return (
                  <td class={align} key={prop}>
                    {render ? customRender?.({ text: record[prop], record }) : record[prop]}
                  </td>
                )
              })}
            </tr>
          )
        })
      } else {
        bodyContent = <tr><td colspan='5' style='text-align: center;'>无数据</td></tr>
      }
      return (
        <table class='basic-upload-file-table'>
          <colgroup>
            {columnList.map((item) => {
              const { width = 0, prop } = item
              const style: CSSProperties = {
                width: `${width}px`,
                minWidth: `${width}px`,
              }
              return <col style={width ? style : {}} key={prop} />
            })}
          </colgroup>
          <thead>
            <tr>
              {columnList.map((item) => {
                const { label = '', align = 'center', prop } = item
                return (
                  <th class={align} key={prop}>
                    {label}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>{bodyContent}</tbody>
        </table>
      )
    }
  },
})
</script>

<style lang="scss">
.basic-upload-file-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--border-color);

  .center {
    text-align: center;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  thead {
    background-color: var(--background-main-color);
  }

  th,
  td {
    padding: 12px 8px;
    border: 1px solid var(--border-color);
  }
}
</style>
