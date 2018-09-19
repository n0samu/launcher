import { IGameInfo } from "./interfaces";
import { shallowStrictEquals } from "../Util";

export class GameInfo {
  /**
   * Override the properties of a game info object with those of another
   * @param target Object to override property values of
   * @param source Object to copy prroperty values from
   */
  public static override(target: IGameInfo, source: Partial<IGameInfo>): void {
    Object.assign(target, source);
  }

  /** Create an copy of a game info object with identical properties */
  public static duplicate(game: IGameInfo): IGameInfo {
    return Object.assign({}, game);
  }

  /** If all properties of two game info objects are identical */
  public static equals(game: IGameInfo, otherGame: IGameInfo): boolean {
    return shallowStrictEquals(game, otherGame);
  }
}