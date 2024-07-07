import { withInstall } from '@/utils'
import cardGrid from './src/CardGrid.vue'
import cardGridItem from './src/CardGridItem.vue'

export const CardGrid = withInstall(cardGrid, {
  cardGridItem,
})
export const CardGridItem = withInstall(cardGridItem)
export default CardGrid
