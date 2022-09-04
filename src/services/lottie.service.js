import Lottie from "lottie-web"

const loadLottie = (ref, data) => {
    const instance = Lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: data
    })
    return instance
}

export const lottieService = {
    loadLottie
}