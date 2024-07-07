import { createSimpleTransition, createJavascriptTransition, createExpandFn } from './src/Transition'

// Fade
export const FadeTransition = createSimpleTransition('tyani-fade')
export const FadeSlideTransition = createSimpleTransition('tyani-fade-slide')
export const FadeBottomTransition = createSimpleTransition('tyani-fade-bottom')
export const FadeScaleTransition = createSimpleTransition('tyani-fade-scale')
export const FadeTopTransition = createSimpleTransition('tyani-fade-top')

// Scale
export const ScaleTransition = createSimpleTransition('tyani-scale')
export const ScaleRotateTransition = createSimpleTransition('tyani-scale-rotate')

// Slide
export const SlideTransition = createSimpleTransition('tyani-slide')
export const SlideXTransition = createSimpleTransition('tyani-slide-x')
export const SlideReverseTransition = createSimpleTransition('tyani-slide-reverse')
export const SlideXReverseTransition = createSimpleTransition('tyani-slide-x-reverse')

// Scroll
export const ScrollTransition = createSimpleTransition('tyani-scroll')
export const ScrollXTransition = createSimpleTransition('tyani-scroll-x')
export const ScrollReverseTransition = createSimpleTransition('tyani-scroll-reverse')
export const ScrollXReverseTransition = createSimpleTransition('tyani-scroll-x-reverse')

// Zoom
export const ZoomFadeTransition = createSimpleTransition('tyani-zoom-fade')
export const ZoomOutTransition = createSimpleTransition('tyani-zoom-out')

// JS 方式创建

// Expand
export const ExpandTransition = createJavascriptTransition('tyani-expand', createExpandFn())
export const ExpandXTransition = createJavascriptTransition('tyani-expand-x', createExpandFn(true))
