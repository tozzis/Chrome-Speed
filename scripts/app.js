new Vue({
    el:"#app",
    data:{
        speed: 1
    },
    created() {
        this.speedVideo()
    },
    methods:{
        speedVideo(){
            let SPEED = this.speed;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                const code = `
                    document.getElementsByTagName('video')[0].playbackRate = ${SPEED};
                    var list = document.querySelectorAll('vg-cuepoint.ng-scope');
                    for (let item of list) {
                        item.style.display = 'none';
                    }
                    console.log('speed up ${SPEED * 100}% !');
                `
            
            chrome.tabs.executeScript(
                tabs[0].id,
                {code});
            });
        }
    }   
})