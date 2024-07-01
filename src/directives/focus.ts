import type { App, DirectiveBinding } from "vue";

export default {
	install(app: App) {
		app.directive('focus', {
      mounted(el: HTMLElement) {
        const focusElement = () => {
          if (el instanceof HTMLDivElement) {
            const component = el.querySelector('input, textarea')
            if (component instanceof HTMLInputElement || component instanceof HTMLTextAreaElement) {
              component.focus()
            }
          } else {
            el.focus()
          }
        }
        focusElement()
      },
      updated(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.value && !binding.oldValue) {
          if (el instanceof HTMLDivElement) {
            const component = el.querySelector('input, textarea')
            if (component instanceof HTMLInputElement || component instanceof HTMLTextAreaElement) {
              component.focus()
            }
          } else {
            el.focus();
          }
        }
      }
		})
	},
}