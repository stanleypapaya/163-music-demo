{
    let view = {
        el: 'section.songs',
        init(){
            this.$el = $(this.el)
        },
        render(data){
            let {songs} = data
            songs.map((song)=>{
                let $li = $(`
            <li>
                <h3>${song.name}</h3>
                <p>
                  <svg class="icon icon-sq">
                    <use xlink:href="#icon-sq"></use>
                  </svg>
                  ${song.singer}
                </p>
                <a class="playButton" href="./song.html?id=${song.id}">
                  <svg class="icon icon-play">
                    <use xlink:href="#icon-play"></use>
                  </svg>
                </a>
            </li>
                `)
                this.$el.find('ol.list').append($li)
            })
        }
    }
    let model = {
        data: {
            songs: []
        },
        find(){
            var query = new AV.Query('Song')
            return query.find().then((songs) => {
              this.data.songs = songs.map((song)=>{
                return {id: song.id, name: song.attributes.name, singer: song.attributes.singer, url: song.attributes.url}
              })
              return songs
            })
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view, model)
}