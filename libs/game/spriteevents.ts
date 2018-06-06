enum SpriteType {
    //% block="player"
    Player = 1,
    //% block="food"
    Food = 1 << 1,
    //% block="coin"
    Coin = 1 << 2
}

namespace sprites {
    /**
     * Gets the sprite type
     */
    //% blockHidden=1
    //% shim=TD_ID blockId=spritetype block="%type"
    export function spriteType(type: SpriteType): number {
        return type;
    }

    /**
     * Register an event when a particular type of sprite is created
     * @param type 
     * @param sprite 
     */
    //% group="Lifecycle"
    //% block=spritesondestroyed block="on created %type=spritetype $sprite"
    export function onCreated(type: number, handler: (sprite: Sprite) => void): void {
        if (!handler || !type) return;

        const scene = game.currentScene();
        scene.createdHandlers.push({
            type: type,
            handler: handler
        })
    }

    /**
     * Register an event when a particular type of sprite is destroyed
     * @param type 
     * @param sprite 
     */
    //% group="Lifecycle"
    //% weight=100
    //% block=spritesondestroyed block="on destroyed %type=spritetype $sprite"
    export function onDestroyed(type: number, handler: (sprite: Sprite) => void) {
        if (!handler || !type) return;
        
        const scene = game.currentScene();
        scene.destroyedHandlers.push({
            type: type,
            handler: handler
        })
    }

    /**
     * Register code to run when sprites overlap
     */
    //% group="Overlaps"
    //% weight=100
    //% blockId=spritesoverlap block="on %type=spritetype $sprite overlaps with %otherType=spritetype $otherSprite"
    export function onOverlap(type: number, otherType: number, handler: (sprite: Sprite, otherSprite: Sprite) => void) {
        if (!type || !otherType ||!handler) return;

        const scene = game.currentScene();
        scene.overlapHandlers.push({
            type: type,
            otherType: otherType,
            handler: handler
        })        
    }
}

namespace scene {
    /**
     * Register a code handler when a collision happens
     * @param direction 
     * @param tile 
     * @param handler 
     */
    //% group="Collisions"
    //% weight=100
    //% blockId=spritesollisions block="on %spriteType=spritetype $sprite hit tile %tileIndex=colorindexpicker"
    export function onHitTile(spriteType: number, tile: number, handler: (sprite: Sprite) => void) {
        if (!spriteType || !handler) return;

        const scene = game.currentScene();
        scene.collisionHandlers.push({
            type: spriteType,
            tile: tile,
            handler: handler
        })        
    }    
}