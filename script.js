document.addEventListener("DOMContentLoaded", (event) => {
  eventAnimationFocusInputs()
});

function eventAnimationFocusInputs() {
  document.querySelectorAll('.easyClock-inputs > div')?.forEach((item) => {
    item?.querySelector('input')?.addEventListener('focus', (e) => {
      item?.classList?.add('selected')
    })

    item?.querySelector('input')?.addEventListener('focusout', (e) => {
      if (!e?.target?.value) {
        item?.classList?.remove('selected')
      }
    })
  })
}
