import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

// class-style
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string // !表示msg一定会赋值，不是空的=》非空断言

  onClick() {
    console.log(this.msg)
  }

  render(h: CreateElement) {
    console.log(h)
    return <div onClick={this.onClick}>{this.msg}</div>
  }
}
