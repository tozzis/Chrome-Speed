new Vue({
    el:"#app",
    data:{
        speed: 1,
        isEdit: false,
        listSpeeds: [0.5, 1, 1.25, 1.5, 2, 2.5, 3]
    },
    created() {
        let speeds = localStorage.getItem('speeds');
        if(speeds) {
            this.listSpeeds = JSON.parse(speeds);
        }
    },
    methods:{
        async clickSpeed(speed) {
            this.speed = speed;
            await this.speedVideo();
        },
        async speedVideo() {
            let SPEED = this.speed;
            const tabs = await this.getTabs();
            const tabId = (tabs.length > 0) ? tabs[0].id : null;
            chrome.scripting.executeScript({
                target: {tabId},
                func: (SPEED) => {
                    let video = document.getElementsByTagName('video')[0];
                    if(video) {
                        video.playbackRate = SPEED;
                        let list = document.querySelectorAll('vg-cuepoint.ng-scope');
                        for (let item of list) {
                            item.style.display = 'none';
                        }
                        console.log(`speed up ${SPEED * 100}% !`);
                    }
                },
                args: [SPEED],
            });
        },
        async getTabs() {
            return await chrome.tabs.query({active: true, currentWindow: true});
        },
        changeSpeed() {
            this.isEdit = !this.isEdit
            localStorage.setItem("speeds", JSON.stringify(this.listSpeeds));
        }
    }   
})