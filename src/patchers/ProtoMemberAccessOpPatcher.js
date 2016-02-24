import MemberAccessOpPatcher from './MemberAccessOpPatcher.js';

export default class ProtoMemberAccessOpPatcher extends MemberAccessOpPatcher {
  patchAsExpression() {
    this.expression.patch();
    // `a::b` → `a.prototype.b`
    //   ^^        ^^^^^^^^^^
    let memberNameToken = this.getMemberNameToken();
    this.overwrite(this.expression.after, memberNameToken.range[0], '.prototype.');
  }

  hasImplicitOperator(): boolean {
    return false;
  }

  getFullMemberName(): string {
    return `prototype.${this.getMemberName()}`;
  }
}
