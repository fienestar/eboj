function append_new_problem_label(text, color) {
    const problem_title = document.getElementById('problem_title')
    const new_label = document.createElement('span')
    new_label.innerText = text;
    new_label.className = 'problem-label';
    new_label.style.backgroundColor = color;
    problem_title.parentElement.insertBefore(new_label, problem_title.nextElementSibling);
    return new_label;
}

async function tier_of(id) {
    const info = await fetch("https://solved.ac/api/v3/problem/show?problemId=" + encodeURIComponent(id)).then(v => v.json())
    return parseInt(info.level)
}

async function show_tier_button() {
    const problem_matched = window.location.href.match(/acmicpc\.net\/problem\/(\d+)/)
    const solvedac_tier = document.getElementsByClassName('solvedac-tier');

    if (problem_matched && (solvedac_tier.length === 0 || solvedac_tier[0].src.endsWith('relative-0.svg'))) {
        const problem_number = parseInt(problem_matched[1]);
        const button = append_new_problem_label('티어 보기', '#9370DB')
        let status = 0;
        button.addEventListener('click', async () => {
            const solvedac_tier = document.getElementsByClassName('solvedac-tier');

            if (solvedac_tier.length && !solvedac_tier[0].src.endsWith('relative-0.svg')) {
                button.innerText = '티어 보기'
                const split = solvedac_tier[0].src.split('/')
                split.pop();
                solvedac_tier[0].src = split.join('/') + `/relative-0.svg`;
                return;
            }

            if (status == 1) return;
            status = 1;
            button.innerText = '티어 가져오는중...'
            try{
                const tier = await tier_of(problem_number);
                button.innerText = '티어 가리기'
                status = 0;
                if (solvedac_tier.length) {
                    const split = solvedac_tier[0].src.split('/')
                    split.pop();
                    solvedac_tier[0].src = split.join('/') + `/${encodeURIComponent(tier)}.svg`
                } else {
                    const problem_title = document.querySelectorAll(`a[href="\/problem\/${problem_number}"]`)[0]
                    const img = document.createElement('img')
                    img.src = `https://d2gd6pc034wcta.cloudfront.net/tier/${encodeURIComponent(tier)}.svg`
                    img.className = "solvedac-tier"
                    problem_title.prepend(img, " ")
                }
            }catch(e){
                button.innerText = '티어 보기 실패'
                status = 0;
            }
        })
    }
}
