(function(w){
    w.data = {
        activeNames : [],
        sceneColor : "#FFFFFF",
    };
    w.methods = {
        panelClick : function(){
            window.helper.isUseController = false;
            window.helper.controls.controls.enabled = false;
            window.helper.controls.controls.saveState();
        },
        workPanelClick : function(){
            if(!window.helper.isUseController){
                window.helper.controls.controls.reset();
                window.helper.controls.controls.enabled = true;
                window.helper.isUseController = true;
            }
        },
        handleChange : function(){

        },
        sceneColorChange : function(color){
            app.sceneColor = color;
            window.helper.scene.background = new THREE.Color(app.sceneColor);
            //window.helper.renderer.render(window.helper.scene,window.helper.camera);
        }
    };
})(window);