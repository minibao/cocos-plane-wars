import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    private speed: number = 500

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position
        this.node.setPosition(pos.x, pos.y + this.speed * deltaTime, pos.z)

        if (pos.y > 600) {
            this.node.destroy()
        }
    }
}


