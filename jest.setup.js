import { chrome } from 'jest-chrome';
import { jest } from '@jest/globals';

global.chrome = chrome;
global.jest = jest;
process.env.NODE_ENV = 'test';