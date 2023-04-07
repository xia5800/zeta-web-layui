import lottie from 'lottie-web'
import type { RendererType } from 'lottie-web'

export interface LottieParams {
  name: string
  containerId: string
  path?: string
  animationData?: any
  loop?: boolean
  renderer?: RendererType
}

function getElement(id: string) {
  return document.querySelector(id)!
}

export { lottie }

export function useLottie({
  name,
  containerId,
  path,
  animationData,
  loop = true,
  renderer = 'svg',
}: LottieParams) {
  return lottie.loadAnimation({
    name,
    path,
    animationData,
    loop,
    renderer,
    container: getElement(containerId),
  })
}

export function useListLottie(list: LottieParams[]) {
  return list.forEach(item => useLottie(item))
}
