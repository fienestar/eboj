

window.addEventListener('load', () => {
  const language_chosen_element = document.getElementById('language_chosen');

  if(!language_chosen_element) return;

  function addCheckbox() {
    const checkbox_div = document.createElement('div')
    checkbox_div.className = 'checkbox'
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    label.appendChild(checkbox)
    label.appendChild(document.createTextNode('언어 기억하기'))
    checkbox_div.appendChild(label)
    language_chosen_element.parentElement.appendChild(checkbox_div)

    return checkbox;
  }

  const checkbox = addCheckbox();
  const remember_language_key = 'remember-language';
  checkbox.checked = localStorage.getItem(remember_language_key) === 'true';

  let onchange = null;
  checkbox.addEventListener('change', () => {
    onchange?.();
  })

  const language = $('#language');
  const last_chosen_language_key = 'last-chosen-language';

  $('#language').chosen().change(() => {
    onchange?.();
  })

  onchange = () => {
    localStorage.setItem(remember_language_key, checkbox.checked);
    if(checkbox.checked) {
      localStorage.setItem(last_chosen_language_key, language.val());
    }
  }

  language.val(localStorage.getItem(last_chosen_language_key) ?? language.val());
  language.trigger('chosen:updated');
})
