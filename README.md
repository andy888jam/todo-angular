# Note

## app module

### Concept

Component setting in ts

Module vs Standalone Component

@for vs \*ngFor(Old)

@if vs \*ngIf(Old)

### Property binding

parent to child

`<app-user
        [user]="user"
        [selected]="user.id === selectedUserId"
      />`

### Event binding

child to parent

$event is the default event variable

`<app-user
          (select)="onSelectUser($event)"
      />`

### Zone.js vs Signals

| 特性     | 傳統機制 (Zone.js + Dirty Checking)                                          | 新機制 (Signals)                                             |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 檢測範圍 | 組件樹級別。只要發生事件（如點擊），Angular 通常會從根部開始檢查整個組件樹。 | 原子級別。直接定位到受影響的 DOM 節點。                      |
| 精準度   | 較低。即使只有一個數字變了，可能也要重新檢查幾十個組件。                     | 極高（Fine-grained）。只更新與該 Signal 綁定的特定 UI 片段。 |
| 性能開銷 | 較高，隨著應用規模擴大，檢查負擔會增加。                                     | 較低，跳過了不必要的檢查邏輯。                               |

### 「傳統變數 + Getter」轉向「Signal + Computed」的核心進化

#### 傳統屬性定義

##### 宣告

` selectedUser = DUMMY_USERS[randomIndex];`

##### 私有變數

only available in this class cannot be accessed in template:

` private selectedUser = DUMMY_USERS[randomIndex];`

##### getter

when using getter, you use it like a property, not a method, which means you can use it in template without parentheses

```typescript
get imagePath() {
  return `assets/users/${this.selectedUser.avatar}`;
}
```

##### 重新賦值

`this.selectedUser = DUMMY_USERS[randomIndex];`

#### 新版signal屬性定義

##### 宣告

`selectedUser_new = signal(DUMMY_USERS[randomIndex]);`

##### computed

only compute the image path when the Signal used inside changes

```typescript
imagePath = computed(() => `assets/users/${this.selectedUser_new().avatar}`);
```

##### 重新賦值

signal set method is used to update the value of the signal

this.selectedUser_new.set(DUMMY_USERS[randomIndex]);

### Interface vs Type

outsource type: 將type移動到model中

model.ts專門用來定義資料結構

most of the time,interface and type are interchangeable, but in Angular project we use "interface" more often

`type User = {
 id: string;
 avatar: string;
 name: string;
 }`

interface can only define object type but type can define any type

`interface User {
  id: string;
  avatar: string;
  name: string;
}`

### @Input (父傳子Data In) vs @Output (子傳父Event Out)

#### 舊版

! 是 TypeScript 的「確定賦值斷言」，告訴編譯器：「雖然我現在沒給它初始值，但我保證 Angular 在執行時一定會透過 Input 給它值，你別擔心。」

`@Input({ required: true }) selected!: boolean;`

EventEmitter 是一個發射器，專門用來「廣播」事件。 <string> 代表這個事件發射出去時，會夾帶一個 string 型態的資料（通常是 user.id）

`@Output() select = new EventEmitter<string>();`

`this.select.emit(this.user.id);`

#### 新版

input as a signal (function)

- <> is a typescript thing, eg <T> is a generic type, T is a placeholder for a type

- If it is required, you can't set the initial value, you have to "set it" in the template

- You can't change the value of the input, you have to set it in the parents' template

`avatar = input.required<string>();`

`name = input.required<string>();`

Output

- Notice that output doesn't create a signal like input, it is an EventEmitter // the template still use the same way

`select_new = output<string>();`

`this.select_new.emit(this.user.id);`
