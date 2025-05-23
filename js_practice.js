async function randompokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;

    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;


    try{
        const res= await fetch(url);
        const data =await res.json();

        const front = data.sprites.front_default;
        const back = data.sprites.back_default;
        const artwork = data.sprites.other["official-artwork"].front_default;
        const home = data.sprites.other.home.front_default;


        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const loadImage = add => new Promise((resolve, reject) => {
            if (!add) return resolve(null);
            const img = new Image();
            img.onload = () => resolve(add);
            img.onerror = () => resolve(null);
            img.src = add;
        });

          await Promise.all([
            loadImage(artwork),
            loadImage(front),
            loadImage(back),
            loadImage(home)
        ]);




        let html = `<h1>${speciesData.names.find(n=>n.language.name === 'ko').name}</h1>`;

        html += `<img src="${artwork}" alt="${data.name}">
                    <img src="${front}" alt="앞모습">`;

        if (back) {
            html += `<img src="${back}" alt="뒷모습">`;
        }

        html += `<p>번호: ${data.id}</p>
                 <p>키: ${(data.height/10) + "M"}</p>
                 <p>몸무게: ${(data.weight/10)+"KG"}</p>`;

        document.getElementById("pokemon-info").innerHTML = html;

        const button = document.querySelector(".poke-button");
        const imgUrl = data.sprites.other["official-artwork"].front_default;

        if (imgUrl) {
                // 자바스크립트를 사용해 동적으로 버튼 배경 이미지 설정
            button.style.backgroundImage = `url('${home}')`;
        }
        else {
            button.style.backgroundImage = "";
        }


        }
        catch(err){
        console.error("에러",err);
        }

}







