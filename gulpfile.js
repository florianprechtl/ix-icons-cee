/*
 * SPDX-FileCopyrightText: 2022 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const rename = require('gulp-rename');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

const fontName = 'ix-icons';
const className = 'glyph';
const template = 'ix-style';
const startUnicode = 0xf000

const timestamp = Math.round(Date.now() / 1000);

gulp.task(
  'symbols',
  gulp.series(() =>
    gulp
      .src('./svg/*.svg')
      .pipe(gulp.dest('dist/svg'))
      .pipe(
        iconfont({
          startUnicode,
          fontName,
          formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
          timestamp,
          log: () => {},
        })
      )
      .on('glyphs', (glyphs) => {
        const options = {
          className,
          fontName,
          fontPath: '../fonts/',
          glyphs: glyphs.map((glyph) => ({
            name: glyph.name,
            codepoint: glyph.unicode[0].charCodeAt(0),
          })),
        };
        gulp
          .src(`templates/${template}.css`)
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: fontName }))
          .pipe(gulp.dest('dist/css/'));

        gulp
          .src(`templates/${template}.scss`)
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: fontName }))
          .pipe(gulp.dest('dist/scss/'));

        gulp
          .src(`templates/${template}.html`)
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: 'sample' }))
          .pipe(gulp.dest('dist/'));

        gulp
          .src(`templates/${template}.json`)
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: 'sample' }))
          .pipe(gulp.dest('dist/'));
      })
      .pipe(gulp.dest('dist/fonts/'))
  )
);
