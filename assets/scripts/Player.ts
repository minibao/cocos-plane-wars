import { _decorator, Animation, Collider2D, Component, Contact2DType, EventTouch, input, Input, instantiate, Node, Prefab, v2, v3, Vec2, view } from 'cc';
const { ccclass, property } = _decorator;

enum ShootType {
    SINGLE,
    DOUBLE
}
@ccclass('Player')
export class Player extends Component {
    @property(Prefab)
    private bullet1Prefab: Prefab = null

    @property(Prefab)
    private bullet2Prefab: Prefab = null

    @property(Node)
    private bulletParent: Node = null

    @property(Node)
    private bullet1Pos: Node = null

    @property(Node)
    private bullet2LeftPos: Node = null

    @property(Node)
    private bullet2RightPos: Node = null

    @property(Animation)
    private anim: Animation = null

    @property
    private shootRate: number = 0.3

    private boundary: Vec2 = v2(230, 380)
    private animHit: string = 'player-hit'
    
    private shootTime: number = 0
    private shootType: ShootType = ShootType.SINGLE
    private collider: Collider2D = null
    private isDown: boolean = false

    onLoad() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)

        this.collider = this.getComponent(Collider2D)

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    update(dt: number) {
        if (!this.isDown) {
            switch (this.shootType) {
                case ShootType.SINGLE:
                    this.shootSingle(dt)
                    break
            
                case ShootType.DOUBLE:
                    this.shootDouble(dt)
                    break
            }
        }
    }

    private onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        this.isDown = true
        this.anim.play(this.animHit)
        this.collider.enabled = false
        this.scheduleOnce(() => {
            this.node.destroy()
        }, 1)
    }

    private shootSingle(dt: number): void {
        this.shootTime += dt
        if (this.shootTime >= this.shootRate) {
            this.shootTime = 0
            const bullet1 = instantiate(this.bullet1Prefab)
            this.bulletParent.addChild(bullet1)
            bullet1.setWorldPosition(this.bullet1Pos.worldPosition)
        }
    }

    private shootDouble(dt: number): void {
        this.shootTime += dt
        if (this.shootTime >= this.shootRate) {
            this.shootTime = 0
            const bullet1 = instantiate(this.bullet2Prefab)
            const bullet2 = instantiate(this.bullet2Prefab)

            this.bulletParent.addChild(bullet1)
            this.bulletParent.addChild(bullet2)
            bullet1.setWorldPosition(this.bullet2LeftPos.worldPosition)
            bullet2.setWorldPosition(this.bullet2RightPos.worldPosition)
        }
    }

    private onTouchMove(event: EventTouch): void {
        if (this.isDown) return
        const { x, y, z } = this.node.position
        const boundaryX = this.boundary.x
        const boundaryY = this.boundary.y
        const targetPos = v3(x + event.getDeltaX(), y + event.getDeltaY(), z)

        if (targetPos.x < -boundaryX) {
            targetPos.x = -boundaryX
        }
        if (targetPos.x > boundaryX) {
            targetPos.x = boundaryX
        }
        if (targetPos.y < -boundaryY) {
            targetPos.y = -boundaryY
        }
        if (targetPos.y > boundaryY) {
            targetPos.y = boundaryY
        }

        this.node.setPosition(targetPos)
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)
        if (this.collider) {
            this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }
}


