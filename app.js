const form = document.querySelector('#searchForm');
const display = document.querySelector('#display')

// menambahkan event pada form search
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const searchTerm = form.elements.query.value
  reset()
  search(searchTerm)

})

// funngsi untuk  menangkap data dari API
async function search(searchForm) {
  try {
    const config = { params: { q: searchForm } }
    const res = await axios.get('https://api.tvmaze.com/search/shows', config)
    const shows = res.data
    for (const data of shows) {

      content(data.show)
    }
  } catch (error) {
    console.log("data Not Found", error)
  }
}
// funsi untuk menampilkan ke antarmuka
function content(data) {
  const article = document.createElement('ARTICLE');
  const newFig = document.createElement('FIGURE');
  const subFig = document.createElement('DIV');
  const img = document.createElement('IMG');

  const media = document.createElement('DIV');
  const content = document.createElement('DIV');
  const p = document.createElement('P');


  article.classList.add('media', 'panel-block');
  newFig.classList.add('media-left', "is-hidden-mobile");
  subFig.classList.add('image', 'is-4by5');

  media.classList.add('media-content')
  content.classList.add('content')
  let rating = ""
  if (data.rating.average != null) {
    rating = data.rating.average
  } else {
    rating = "-"
  }
  p.innerHTML = `<strong>${data.name}</strong> <br/> <small>Rating ${rating}</small> <br/> ${data.summary} `
  const gambar = "https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg";
  if (data.image == null) {
    img.src = gambar;
  } else {
    img.src = data.image.medium
  }
  display.append(article);
  article.append(newFig);
  newFig.append(subFig);
  subFig.append(img)
  article.append(media)
  media.append(content)
  content.append(p)

}

// untuk mereset tampilan agar tidak menumpuk
function reset() {
  let article = document.querySelectorAll('article.media');
  if (article.length > 0) {
    for (let i = 0; i < article.length; i++)
      article[i].remove()
  }
}

// menu contact
const contact = document.querySelector('#contact')
contact.addEventListener('click', menuContact)
// menu about
const about = document.querySelector('#about')
about.addEventListener('click', menuAbout)
function menuContact() {
  const profile = document.createElement('DIV');
  profile.innerHTML = `<section class="hero is-success is-halfheight">
    <div class="hero-body">
      <div class="">
        <p class="title">Ahmad Supriyatna</p>
        <p class="subtitle">Web Developer</p>
        <div class="columns is-desktop">
          <div class="column">
            <figure class="media-left">
              <div class="image ">
                <img class="is-rounded"
                  src="https://avatars.githubusercontent.com/u/82861827?s=400&u=7f8355462ded981d08c6af17a9f21a3a4e293428&v=4"
                />
              </div>
            </figure>
          </div>
          <div class="column is-three-quarters">
            <p class="subtitle is-5">Contact <ol>
              <li>E-mail    : <a href="mailto:ahmadsupriyatna1@gmail.com">ahmadsupriyatna1@gmail.com</a></li>
              <li>Github    : <a href="https://github.com/AhmadSupriyatna">https://github.com/AhmadSupriyatna</a></li>
              <li>Instagram : <a href="https://www.instagram.com/_ahmadsupriyatna/">_ahmadsupriyatna</a></li>
            </ol></p>
          </div>
        </div>
      </div>
    </div>
  </section>`
  display.append(profile)
}
function menuAbout() {
  const profile = document.createElement('ARTICLE');
  profile.innerHTML = `<section class="hero is-danger is-halfheight">
    <div class="hero-body">
      <div class="">
        <p class="title">TV Show Search</p>
        <p class="subtitle">Website Reuquest API<sup>*</sup> pertama saya *(saya belum tau istilah web)</p>
        <div class="columns is-desktop">
          <div class="column is-full">
            <p class="subtitle is-5">Website ini dibuat berdasarkan kursus dari Bootcamp Udemy dengan Pengajar Colt Steele</p>
            <p>Dibangun dengan API dari TVMazze, dan style fremework css Bulma</p>
            <p>Fitur yang saya tambahkan:</p>
            <small>
                <ul>
                    <li>Menampilkan gambar generik untuk dilm yang tidak memiliki data image</li>
                    <li>Menampilkan Judul Film</li>
                    <li>Menampilkan Rating</li>
                    <li>Film yang tidak memiliki rating menampilkan strip</li>
                    <li>Menampilkan Summary Film</li>
                    <li>Menghapus Button Submit</li>
                    <li>Menambahkan function reset agar tidak terjadi tumpukan</li>
                    <li>Menghilangkan gambar Film untuk tampilan mobile</li>
                </ul>
            </small>
            <p>Terimakasih telah melihat website ini, tentunya masih banyak kekurangan yang perlu di kurangi dan fitur yang di tambahkan, saran dan kritikan teman-teman silahkan sampaikan langsung melalui tab contact di web ini. </p>
          </div>
        </div>
      </div>
    </div>
  </section>`
  display.append(profile)
}