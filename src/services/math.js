/* eslint-disable no-mixed-operators */
import { ref } from 'vue';

export class MyMath {
  //** Округление **//
  static round = (value, round = 2) => +value.toFixed(round);

  static roundTo(num, multiple) {
    return Math.round(num / multiple) * multiple;
  }

  //** Рандом в диапазоне от min до max **//
  static random = (min, max) => this.round(Math.random() * (max - min) + min);

  //** Рандом ID **//
  static randomID = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  //** Рандом первоначальной позиции за экраном **//
  static getStartPosition(size) {
    const xExtreeme = Math.random() < 0.5;
    const signExtreeme = Math.random() < 0.5;
    const sceneWidth = window.innerHeight * 1.5;
    const sceneHeight = window.innerHeight;
    return xExtreeme
      ? [ref(signExtreeme ? 0 - size : sceneWidth + size), ref(this.random(0 - size, sceneHeight + size))]
      : [ref(this.random(0 - size, sceneWidth + size)), ref(signExtreeme ? 0 - size : sceneHeight + size)];
  }

  //** Числа в строки с E+10 нотацией  **//
  static toEText = (number) => number.toPrecision(3);

  //** Числа в строки с буквенной нотацией **//
  static toText(number, rounded = 2) {
    if (number >= 1_000_000_000_000_000) {
      return `${this.round(number / 1_000_000_000_000_000, 1)}Q`;
    }
    if (number >= 1_000_000_000_000) {
      return `${this.round(number / 1_000_000_000_000, 1)}T`;
    }
    if (number >= 1_000_000_000) {
      return `${this.round(number / 1_000_000_000, 1)}B`;
    }
    if (number >= 1_000_000) {
      return `${this.round(number / 1_000_000, 1)}M`;
    }
    if (number >= 1000) {
      return `${this.round(number / 1_000, 1)}K`;
    }
    return this.round(number, rounded);
  }

  //** Время в читаемом виде **//
  static toTime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    let time = '';
    if (days) time += `${days}д. `;
    if (hours) time += `${hours}ч. `;
    if (minutes) time += `${minutes}м. `;
    if (seconds) time += `${seconds}с. `;
    return time;
  }
}

export class MyRotate {
  //** Радианы в градусы **//
  static getDegInRad = (value) => (value * 180) / Math.PI;

  //** Градусы в радианы **//
  static getRadInDeg = (value) => (value * Math.PI) / 180;

  //** Вращение объекта к цели **//
  static rotate(ABx, ABy, distance) {
    const radY = this.getDegInRad(Math.acos(ABy / distance));
    return ABx < 0 ? radY : -radY;
  }

  //** Вращение объекта к цели обратной стороной**//
  static rotateReverse(ABx, ABy, distance) {
    const radY = this.getDegInRad(Math.acos(ABy / distance));
    return ABx < 0 ? 180 + radY : 180 - radY;
  }

  //** Точное вращение объекта к цели (прилягание врагов к башне) **//
  static rotatePrecise(ABx, ABy, distance) {
    const radX = this.getDegInRad(Math.acos(ABx / distance));
    const radY = this.getDegInRad(Math.acos(ABy / distance));

    if (radX < 45) {
      return radY <= 90 ? radX : -radX;
    }
    if (radX < 90) {
      return radY <= 90 ? -radY : 180 - radY;
    }
    if (radX < 135) {
      return radY <= 90 ? radY : (180 - radY) * -1;
    }
    return radY <= 90 ? (180 - radX) * -1 : 180 - radX;
  }
}

export class MyVector {
  static getVector = (Ax, Ay, Bx, By) => [Bx - Ax, By - Ay];

  static getLength = (ABx, ABy) => Math.sqrt(ABx ** 2 + ABy ** 2);

  static getVectorLength = (Ax, Ay, Bx, By) => this.getLength(Bx - Ax, By - Ay);

  static getNormalize = (ABx, ABy, length) => [ABx / length, ABy / length];

  static getVectorNormalize = (Ax, Ay, Bx, By) => this.getNormalize(Bx - Ax, By - Ay, this.getLength(Bx - Ax, By - Ay));

  static isCollision = (ABx, ABy, Ar, Br) => (Ar + Br) ** 2 >= ABx ** 2 + ABy ** 2;

  static isCollisionFast = (Ax, Ay, Ar, Bx, By, Br) => this.isCollision(Bx - Ax, By - Ay, Ar, Br);
}

export const CONST = {
  SECOND: 1_000,
  MINUTE: 60 * 1_000,
  HOUR: 60 * 60 * 1_000,
  DAY: 24 * 60 * 60 * 1_000,
  BULLET: {
    SIZE: 7,
    SPEAD: 7,
  },
  SLUG: {
    SIZE: 6.5,
    SPEAD: 5,
  },
  TOWER: {
    SIZE: 50,
    COOLDOWN: 1_000,
    START_DOLLARS: 100,
  },
  BALL: {
    SIZE: 18,
    DISTANCE: 300,
  },
  PERIMETER: {
    SIZE_BASE: 600,
  },
  WALL: {
    SIZE: 200,
    BUILDING_TIME: 1_000 * 60 * 8,
  },
  DISCARD_WAVE: {
    SIZE: 5,
    SPEAD: 4,
    COOLDOWN: 25_000,
  },
  MINE: {
    SIZE: 18,
    LIFETIME: 30_000,
  },
  PACK: {
    SIZE: 25,
    SPEAD: 2,
    DEPOSIT: {
      COOLDOWN: 50_000,
    },
  },
  GAME: {
    WAVE_INIT: 3_000,
    WAVE_LONG: 25_000,
    WAVE_DELAY: 5_000,
  },
  ENEMY: {
    COOLDOWN: 1_000,
    SIZE: {
      COMMON: 15,
      TANK: 30,
      BOSS: 60,
    },
    SPEAD: {
      BASE: 3,
      COEF_QUICK: 2.5,
      COEF_TANK: 0.8,
      COEF_BOSS: 0.5,
    },
    HP: {
      COEF_TANK: 2,
      COEF_BOSS: 5,
    },
    DAMAGE: {
      COEF_TANK: 1,
      COEF_BOSS: 3,
    },
    VALUTE: {
      COEF_QUICK: 2,
      COEF_TANK: 2,
      COEF_BOSS: 5,
    },
  },
};
