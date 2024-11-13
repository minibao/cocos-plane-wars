import { _decorator, Animation, Collider2D, Component, Contact2DType, Node } from 'cc';
import { Bullet } from './Bullet'
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property(Animation)
    private anim: Animation = null

    @property
    private animHit: string = ''

    @property
    private animDown: string = ''

    @property
    private speed: number = 300

    @property
    private hp: number = 1

    private collider: Collider2D = null

    start() {
        this.collider = this.getComponent(Collider2D)

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        if (otherCollider.getComponent(Bullet)) {
            this.hp -= 1
            setTimeout(() => {
                otherCollider.node?.destroy()
            }, 10)

            if (this.hp <= 0) {
                this.anim.play(this.animDown)
                this.collider.enabled = false
                setTimeout(() => {
                    this.node?.destroy()
                }, 1000)
            } else {
                this.anim.play(this.animHit)
            }
        } 
    }

    update(deltaTime: number) {
        if (this.hp > 0) {
            const pos = this.node.position
            this.node.setPosition(pos.x, pos.y - this.speed * deltaTime, pos.z)
        }

        if (this.node.position.y < -600) {
            this.node.destroy()
        }
    }

    onDestroy() {
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
}


