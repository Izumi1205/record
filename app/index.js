import React from 'react';
import ReactDOM from 'react-dom';
// 导入样式
import indexStyle from './index.css';
// import './detail.less';
const bodyId = document.getElementById('root');
ReactDOM.render(<div>
    <h1 className={indexStyle.main} >hello-world的世界，webpack4.0 + react 架构搭建，追逐梦想，又不中奖，没有中奖的命</h1>
    <h3 className={indexStyle.content} >css-module</h3>
    <div className="nav" >
        天龙八部
        <div className="item" >子项目</div>
    </div>
</div>, bodyId);



// let element = document.getElementById('root');
// element.innerHTML = 'helleworld的世界, webpack4.0 + react 架构搭建';