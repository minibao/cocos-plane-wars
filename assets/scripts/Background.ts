import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {
    @property(Node)
    private bg1: Node = null

    @property(Node)
    private bg2: Node = null

    @property
    private speed: number = 120


    update(deltaTime: number) {
        const bg1Pos = this.bg1.position
        this.bg1.setPosition(bg1Pos.x, bg1Pos.y - this.speed * deltaTime , bg1Pos.z)
        const bg2Pos = this.bg2.position
        this.bg2.setPosition(bg2Pos.x, bg2Pos.y - this.speed * deltaTime , bg2Pos.z)

        const offsetH = this.bg1.getComponent(UITransform).height

        if (this.bg1.position.y < -offsetH) {
            this.bg1.setPosition(this.bg2.position.x, this.bg2.position.y + offsetH, this.bg2.position.z)
        }
        if (this.bg2.position.y < -offsetH) {
            this.bg2.setPosition(this.bg1.position.x, this.bg1.position.y + offsetH, this.bg1.position.z)
        }
    }
}


