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
            let liList = songs.map((song)=>$('<li></li>').text(song.name))
            $(this.el).find('ul').empty()
            liList.map((item)=>{
                $(this.el).find('ul').append(item)
            })
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: []
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData)
                console.log('songData')
                console.log(songData)
                this.view.render(this.model.data)
                console.log(this.model.data)
            })
        }
    }
    controller.init(view,model)
}