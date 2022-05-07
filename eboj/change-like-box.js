function change_like_box()
{
    Array.from(document.getElementsByClassName('like-box')).forEach(v => {
        const button = v.nextElementSibling.children[0]
        if (button.style.display == 'none') return;

        v.style.display = ''
        button.style.display = 'none'

        const update = () => {
            let enabled = button.innerText.includes('취소')

            if (enabled) v.style.color = '#0076C0'
            else v.style.color = ''

            if (v.children[1].innerText == '0')
                v.children[1].style.display = 'none'
            else
                v.children[1].style.display = ''
        }

        v.addEventListener('click', () => {
            button.click()
        })

        var observer = new MutationObserver(update)
        observer.observe(button, { attributes: true });

        update()
    })
}
