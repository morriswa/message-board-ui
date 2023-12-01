
export function c_str(f_str:any, ...inject: any) {
    let newerLen = inject.length;

    inject.reverse()

    let newerThing = f_str;

    for (let i = 0; i < newerLen; i++) 
        newerThing = newerThing.replace("{}", inject.pop());
    
    return newerThing
}