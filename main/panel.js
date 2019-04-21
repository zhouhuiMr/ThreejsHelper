(function(w){
    w.data = {
        activeNames : [],
        sceneColor : "#FFFFFF",
        
        isShowAxes : true,
        isShowGrid : true,
        //fog
        isShowFog : false,
        fog : {
            color : "#FFF68F",
            near : 5.0,
            far :  40.0
        },
        //camerahelper
        isShowCamera : false,
        //shadow
        isShowShadow : false,
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
        },
        axesStatusChange : function(checked){
            app.isShowAxes = checked;
            if(app.isShowAxes){
                window.helper.addAxes();
            }else{
                window.helper.removeAxes();
            }
        },
        gridStatusChange : function(checked){
            app.isShowGrid = checked;
            if(app.isShowGrid){
                window.helper.addGrid();
            }else{
                window.helper.removeGrid();
            }
        },
        fogStatusChange : function(checked){
            app.isShowFog = checked;
            window.helper.isUseFog = app.isShowFog;
            if(app.isShowFog){
                window.helper.fog = new THREE.Fog(app.fog.color,app.fog.near,app.fog.far);
                window.helper.scene.fog = window.helper.fog;
            }else{
                window.helper.fog = null;
                window.helper.scene.fog = window.helper.fog;
            }
        },
        fogColorChange : function(color){
            app.fog.color = color;
            if(app.isShowFog){
                window.helper.fog = new THREE.Fog(app.fog.color,app.fog.near,app.fog.far);
                window.helper.scene.fog = window.helper.fog;
            }
        },
        fogNearChange : function(data){
            app.fog.near = data;
            if(app.isShowFog){
                window.helper.fog = new THREE.Fog(app.fog.color,app.fog.near,app.fog.far);
                window.helper.scene.fog = window.helper.fog;
            }
        },
        fogFarChange : function(data){
            app.fog.far = data;
            if(app.isShowFog){
                window.helper.fog = new THREE.Fog(app.fog.color,app.fog.near,app.fog.far);
                window.helper.scene.fog = window.helper.fog;
            }
        },
        cameraStatusChange : function(checked){
            app.isShowCamera = checked;
            window.helper.isUseCameraHelper = app.isShowCamera;
            if(app.isShowCamera){
                window.helper.scene.add(window.helper.cameraHelper);
            }else{
                window.helper.scene.remove(window.helper.cameraHelper);
            }
        },
        shadowStatusChange : function(checked){
            app.isShowShadow = checked;
            window.helper.isUseShadow = app.isShowShadow;
            if(app.isShowShadow){
                //显示阴影
            }else{
                //不显示阴影
            }
        }
    };
})(window);