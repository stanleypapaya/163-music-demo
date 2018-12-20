{
    let view = {
        el: '#songList-container',
        template:  `
    <ul class="songList">
        
    </ul>
        `,
        render(data){
            $(this.el).html(this.template)
            let{songs} = data
            let liList = songs.map((song)=>$('<li></li>').text(song.name).attr('data-id', song.id))
            $(this.el).find('ul').empty()
            liList.map((item)=>{
                $(this.el).find('ul').append(item)
            })
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        },
        activeItem(li){
            $li = $(li)
            $li.addClass('active').siblings('.active').removeClass('active')
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
            })
        }
        
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData)
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click', 'li', (e)=>{
                this.view.activeItem(e.currentTarget)
                let songId = e.currentTarget.getAttribute('data-id')
                let data
                let songs = this.model.data.songs
                for( let i = 0; i < songs.length; i++){
                    if(songs[i].id === songId){
                        data = songs[i]
                        break
                    }
                }
                let string = JSON.stringify(data)
                let object = JSON.parse(string)
                window.eventHub.emit('select', object)
            })
        }
    }
    controller.init(view,model)
}