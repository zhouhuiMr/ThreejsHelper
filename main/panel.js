(function(w){
    w.data = {
        activeNames : [],
        sceneColor : "#FFFFFF",
    };
    w.methods = {
        handleChange : function(){

        },
        sceneColorChange : function(){
            window.helper.scene.background = new THREE.Color(app.sceneColor);
            //window.helper.renderer.render(window.helper.scene,window.helper.camera);
        }
    };
})(window);