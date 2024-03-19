function change_like_box()
{
    Array.from(document.getElementsByClassName('like-box')).forEach(v => {
        const like_box = v.cloneNode(true);
        v.style.opacity = 0
        v.style.maxWidth = 0
        like_box.className = 'cloned-like-box'
        like_box.style.display = ''
        v.parentElement.insertBefore(like_box, v)

        const button = v.nextElementSibling.children[0]
        if (button.style.display == 'none') return;

        button.style.display = 'none'

        const update = () => {
            let enabled = button.innerText.includes('취소')

            if (enabled) like_box.style.color = '#0076C0'
            else like_box.style.color = ''

            like_box.children[1].innerText = v.children[1].innerText

            if (like_box.children[1].innerText == '0')
            like_box.children[1].style.display = 'none'
            else
            like_box.children[1].style.display = ''
        }

        like_box.addEventListener('click', () => {
            button.click()
        })

        var observer = new MutationObserver(update)
        observer.observe(button, { attributes: true });

        update()
    })
}
