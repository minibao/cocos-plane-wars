import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property(Animation)
    private animDown: Animation = null

    @property
    private speed: number = 300

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position
        this.node.setPosition(pos.x, pos.y - this.speed * deltaTime, pos.z)
    }
}


