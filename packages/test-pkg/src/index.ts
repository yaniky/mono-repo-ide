import { ClassA } from "./b";

interface Test {
    a: number,
    b: string
}

export function testFun(): void {
    const clA = new ClassA();

    clA.print("111");
    const a: Test = {
        a: 1,
        b: "test"
    };
    const b: Test = {
        ...a
    };

    console.log(b);
}

const aa: number = 1;

export default {
    aa
};