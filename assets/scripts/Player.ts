import { _decorator, Component, EventTouch, input, Input, instantiate, Node, Prefab, v3, view } from 'cc';
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

    private boundary: number = 0
    private shootRate: number = 0.3
    private shootTime: number = 0
    private shootType: ShootType = ShootType.SINGLE

    onLoad() {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)

        // this.boundary = view.getVisibleSize()
        console.log(view.getViewportRect(), view.getVisibleSize(), view.getVisibleSizeInPixel())
    }

    update(dt: number) {
        switch (this.shootType) {
            case ShootType.SINGLE:
                this.shootSingle(dt)
                break
        
            case ShootType.DOUBLE:
                this.shootDouble(dt)
                break
        }
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
        const { x, y, z } = this.node.position
        const boundaryX = 230
        const boundaryY = 380
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
    }
}


