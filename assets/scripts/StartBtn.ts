import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartBtn')
export class StartBtn extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public onStartHandler(): void {
        director.loadScene('GameStart')
    }
}


