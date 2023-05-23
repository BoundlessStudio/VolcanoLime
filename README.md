![Volcano Lime](https://i.imgur.com/EBVuPvw.png)

![Exmaple](https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2023/05/chat-responses.png)

# System

```mermaid
flowchart LR;
  R(Volcano Lime);
  
  C([Chat]);
  C1([Ask]);
  C2([Goal]);
  C3([Search]);

  S([Skills]);
  S1([Hard Coded]);
  S1A(Convert);
  S1B(MSGraph);
  S1C(GDrive);
  S2([Semantic]);
  S2A(Writer);
  S2B([User Created]);

  P([Planner]);
  P1([Goals]);
  P1A(Action Planer);
  P1B(Sequential Planner);
  P1C(Step Planner);
  P2([Memories]);
  P2A([Leveled]);
  P3([Skills]);

  M([Memories DB]);
  M1([Files])
  M1A(documents)
  M1A1(.docx)
  M1A2(.rft)
  M1A3(.txt)
  M1A4(.md)
  M1A5(.pdf)
  M1A6(.html)
  M1B(data)
  M1B1(.csv)
  M1B2(.xlsx)
  M1B3(.xml)
  M1B4(.json)
  M2([Connectors])
  M2A(Azure)
  M2B(Google)
  M2C(Github)
  M2D(Trello)
  M2E(Notion)
  M2F(Discord)
  M3([Chat History])

  R-->C;
  C-->C1;
  C-->C2;
  C-->C3;

  R-->M;
  M-->M1;
  M1-->M1A;
  M1A-->M1A1;
  M1A-->M1A2;
  M1A-->M1A3;
  M1A-->M1A4;
  M1A-->M1A5;
  M1A-->M1A6;
  M1-->M1B;
  M1B-->M1B1;
  M1B-->M1B2;
  M1B-->M1B3;
  M1B-->M1B4;
  M-->M2;
  M2-->M2A;
  M2-->M2B;
  M2-->M2C;
  M2-->M2D;
  M2-->M2E;
  M2-->M2F;
  M-->M3;

  R-->S;
  S-->S1;
  S1-->S1A;
  S1-->S1B;
  S1-->S1C;
  S-->S2;
  S2-->S2A;
  S2-->S2B;

  R-->P;
  P-->P1;
  P1-->P1A;
  P1-->P1B;
  P1-->P1C;
  P-->P2;
  P2-->P2A;
  P-->P3;

  
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
