{
    let view = {
        el: '#tabs',
        init(){
            this.$el = $(this.el)
        }
    }
    let model = {

    }
    let controller = {
        init(view , model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.loadModule1()
            this.loadModule2()
        },
        bindEvents(){
            this.view.$el.on('click', '.tabs-nav > li', (e)=>{
                let $li = $(e.currentTarget)
                $li.addClass('active').siblings().removeClass('active')
                let tabName = $li.attr('data-tab-name')
                window.eventHub.emit('selectTab', tabName)
            })
        },
        loadModule1(){
            let script1 = document.createElement('script')
            script1.src = './page-1-1.js'
            script1.onload = function(){
                console.log('模块1加载完成')
            }
            document.body.appendChild(script1)
        },
        loadModule2(){
            let script2 = document.createElement('script')
            script2.src = './page-1-2.js'
            script2.onload = function(){
                console.log('模块2加载完成')
            }
            document.body.appendChild(script2)          
        }
    }
    controller.init(view, model)
}