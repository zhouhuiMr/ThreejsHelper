/**
 * three.js 创建对象的时候常用的辅助工具
 *
 * @since 2019.04.20
 * @author zhouhui
 * */
window.onload = function(){
    window.app = new Vue({
        el : "#app",
        data : data,
        methods : methods
    });

    window.helper = new threejsHelper();
    helper.animate();

    //窗口变化
    window.addEventListener( 'resize', function(){
        helper.camera.aspect = window.innerWidth / window.innerHeight;
        helper.camera.updateProjectionMatrix();
        helper.renderer.setSize( window.innerWidth, window.innerHeight );
        helper.renderer.render( helper.scene, helper.camera );
    }, false );
};
(function(w){
    var threejsHelper = function(){
        //scene size
        this.sceneWidth = document.documentElement.clientWidth;
        this.sceneHeight = document.documentElement.clientHeight;

        this.elementID = "container";

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.isUseFog = false;//是否启用雾
        this.fog = null;

        //视角控制器
        this.isUseController = true;
        this.controls = null;
        //网格
        this.coordinateSize = 100;
        this.gridSize = 20;//网格单个格子大小
        this.isUseGrid = true;
        this.gridHelper = null;
        //坐标
        this.isUseAxes = true;
        this.axesHelper = null;
        //相机
        this.isUseCameraHelper = false;
        this.cameraHelper = null;
        //阴影
        this.isUseShadow = false;

        //其他动画
        this.animateQuee = [];

        this.init();
    };
    threejsHelper.prototype = {
        init : function(){
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xFFFFFF);

            this.fog = null;
            this.scene.fog = this.fog;

            //设置摄像机
            this.camera = new THREE.PerspectiveCamera( 75, this.sceneWidth/this.sceneHeight, 1, 3000 );
            this.camera.position.set(0,30,45);

            //设置渲染方式
            this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true } );
            this.renderer.setSize( this.sceneWidth, this.sceneHeight );

            //添加画布
            document.getElementById(this.elementID).appendChild(this.renderer.domElement);

            //视角控制器
            this.controls = new cameraControls(this.camera,this.renderer.domElement);
            this.controls.build();
            //网格
            this.gridHelper = new THREE.GridHelper( this.coordinateSize, this.gridSize, 0x696969 ,0xDCDCDC);
            this.scene.add(this.gridHelper);
            //坐标
            this.axesHelper = new THREE.AxesHelper( this.coordinateSize );
            this.scene.add(this.axesHelper);
            //相机
            this.cameraHelper = new THREE.CameraHelper(this.camera);
            if(this.isUseCameraHelper){
                this.scene.add(this.cameraHelper);
            }
        },
        animate : function(){
            var obj = this;
            window.requestAnimationFrame(function(){
                obj.animate();
            });
            if(this.isUseController){
                this.controls.build();
            }
            //执行其他动画
            for(var i=0;i<this.animateQuee.length;i++){
                if(this.animateQuee[i] != null){
                    this.animateQuee[i]();
                }
            }
            this.renderer.render(this.scene,this.camera);
        },
        addGrid : function(){
            this.isUseGrid = true;
            this.scene.add(this.gridHelper);
        },
        removeGrid : function(){
            this.isUseGrid = false;
            this.scene.remove(this.gridHelper);
        },
        changeGridSize : function(){},
        addAxes : function(){
            this.isUseAxes = true;
            this.scene.add(this.axesHelper);
        },
        removeAxes : function(){
            this.isUseAxes = false;
            this.scene.remove(this.axesHelper);
        }

    };
    w.threejsHelper = threejsHelper;

    /**------------------------**/
    /** 视角控制               **/
    /**------------------------**/
    var cameraControls = function(camera,dom){
        this.camera = camera;
        this.doc = dom;
        this.controls = null;
        this.init();
    };
    cameraControls.prototype = {
        init : function(){
            //初始化
            this.controls = new THREE.OrbitControls(this.camera,this.dom);

            //受到的阻力
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.25;

            this.controls.screenSpacePanning = false;

            //距离原点最大或者最小距离
            this.controls.minDistance = 1;
            this.controls.maxDistance = 200;

            this.controls.maxPolarAngle = Math.PI;

            this.controls.keys = {
                LEFT: 65, //left a
                UP: 87, // up w
                RIGHT: 68, // right d
                BOTTOM: 83 // down s
            }
        },
        build : function(){
            return this.controls.update();
        }
    };
    w.cameraControls = cameraControls;
})(window);