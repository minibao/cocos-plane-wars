import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    private enemy0Prefab: Prefab = null

    @property(Prefab)
    private enemy1Prefab: Prefab = null

    @property(Prefab)
    private enemy2Prefab: Prefab = null

    private enemy0SpawnRate: number = 2
    private enemy1SpawnRate: number = 8
    private enemy2SpawnRate: number = 20

    start() {
        this.schedule(this.enemy0, this.enemy0SpawnRate)
        this.schedule(this.enemy1, this.enemy1SpawnRate)
        this.schedule(this.enemy2, this.enemy2SpawnRate)
    }

    update(deltaTime: number) {
        
    }

    private enemy0(): void {
        this.enemySpawn(this.enemy0Prefab, 215)
    }

    private enemy1(): void {
        this.enemySpawn(this.enemy1Prefab, 200)
    }

    private enemy2(): void {
        this.enemySpawn(this.enemy2Prefab, 150)
    }

    private enemySpawn(enemyPrefab: Prefab, random: number): void {
        const randomX = math.randomRangeInt(-random, random)
        const enemy = instantiate(enemyPrefab)
        this.node.addChild(enemy)
        const { y, z } = enemy.position
        enemy.setPosition(randomX, y, z)
    }

    
    onDestroy() {
        this.unschedule(this.enemy0)
        this.unschedule(this.enemy1)
        this.unschedule(this.enemy2)
    }
}


