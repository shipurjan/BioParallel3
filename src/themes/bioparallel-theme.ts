import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const bioparallelTheme: CustomThemeConfig = {
  name: 'bioparallel',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
    '--theme-font-family-heading': `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    '--theme-font-color-base': 'var(--color-primary-900)',
    '--theme-font-color-dark': 'var(--color-tertiary-50)',
    '--theme-rounded-base': '12px',
    '--theme-rounded-container': '12px',
    '--theme-border-base': '1px',
    // =~= Theme On-X Colors =~=
    '--on-primary': 'var(--color-tertiary-50)',
    '--on-secondary': 'var(--color-primary-900)',
    '--on-tertiary': 'var(--color-primary-900)',
    '--on-success': 'var(--color-primary-900)',
    '--on-warning': 'var(--color-primary-900)',
    '--on-error': 'var(--color-primary-900)',
    '--on-surface': 'var(--color-tertiary-50)',
    // =~= Theme Colors  =~=
    // primary | #023965
    '--color-primary-50': '217 225 232', // #d9e1e8
    '--color-primary-100': '204 215 224', // #ccd7e0
    '--color-primary-200': '192 206 217', // #c0ced9
    '--color-primary-300': '154 176 193', // #9ab0c1
    '--color-primary-400': '78 116 147', // #4e7493
    '--color-primary-500': '2 57 101', // #023965
    '--color-primary-600': '2 51 91', // #02335b
    '--color-primary-700': '2 43 76', // #022b4c
    '--color-primary-800': '1 34 61', // #01223d
    '--color-primary-900': '1 28 49', // #011c31
    // secondary | #62A4D9
    '--color-secondary-50': '231 241 249', // #e7f1f9
    '--color-secondary-100': '224 237 247', // #e0edf7
    '--color-secondary-200': '216 232 246', // #d8e8f6
    '--color-secondary-300': '192 219 240', // #c0dbf0
    '--color-secondary-400': '145 191 228', // #91bfe4
    '--color-secondary-500': '98 164 217', // #62A4D9
    '--color-secondary-600': '88 148 195', // #5894c3
    '--color-secondary-700': '74 123 163', // #4a7ba3
    '--color-secondary-800': '59 98 130', // #3b6282
    '--color-secondary-900': '48 80 106', // #30506a
    // tertiary | #A9D1EE
    '--color-tertiary-50': '242 248 252', // #f2f8fc
    '--color-tertiary-100': '238 246 252', // #eef6fc
    '--color-tertiary-200': '234 244 251', // #eaf4fb
    '--color-tertiary-300': '221 237 248', // #ddedf8
    '--color-tertiary-400': '195 223 243', // #c3dff3
    '--color-tertiary-500': '169 209 238', // #A9D1EE
    '--color-tertiary-600': '152 188 214', // #98bcd6
    '--color-tertiary-700': '127 157 179', // #7f9db3
    '--color-tertiary-800': '101 125 143', // #657d8f
    '--color-tertiary-900': '83 102 117', // #536675
    // success | #69BB28
    '--color-success-50': '233 245 223', // #e9f5df
    '--color-success-100': '225 241 212', // #e1f1d4
    '--color-success-200': '218 238 201', // #daeec9
    '--color-success-300': '195 228 169', // #c3e4a9
    '--color-success-400': '150 207 105', // #96cf69
    '--color-success-500': '105 187 40', // #69BB28
    '--color-success-600': '95 168 36', // #5fa824
    '--color-success-700': '79 140 30', // #4f8c1e
    '--color-success-800': '63 112 24', // #3f7018
    '--color-success-900': '51 92 20', // #335c14
    // warning | #fbaf00
    '--color-warning-50': '254 243 217', // #fef3d9
    '--color-warning-100': '254 239 204', // #feefcc
    '--color-warning-200': '254 235 191', // #feebbf
    '--color-warning-300': '253 223 153', // #fddf99
    '--color-warning-400': '252 199 77', // #fcc74d
    '--color-warning-500': '251 175 0', // #fbaf00
    '--color-warning-600': '226 158 0', // #e29e00
    '--color-warning-700': '188 131 0', // #bc8300
    '--color-warning-800': '151 105 0', // #976900
    '--color-warning-900': '123 86 0', // #7b5600
    // error | #ff3a35
    '--color-error-50': '255 225 225', // #ffe1e1
    '--color-error-100': '255 216 215', // #ffd8d7
    '--color-error-200': '255 206 205', // #ffcecd
    '--color-error-300': '255 176 174', // #ffb0ae
    '--color-error-400': '255 117 114', // #ff7572
    '--color-error-500': '255 58 53', // #ff3a35
    '--color-error-600': '230 52 48', // #e63430
    '--color-error-700': '191 44 40', // #bf2c28
    '--color-error-800': '153 35 32', // #992320
    '--color-error-900': '125 28 26', // #7d1c1a
    // surface | #424855
    '--color-surface-50': '227 228 230', // #e3e4e6
    '--color-surface-100': '217 218 221', // #d9dadd
    '--color-surface-200': '208 209 213', // #d0d1d5
    '--color-surface-300': '179 182 187', // #b3b6bb
    '--color-surface-400': '123 127 136', // #7b7f88
    '--color-surface-500': '66 72 85', // #424855
    '--color-surface-600': '59 65 77', // #3b414d
    '--color-surface-700': '50 54 64', // #323640
    '--color-surface-800': '40 43 51', // #282b33
    '--color-surface-900': '32 35 42', // #20232a
  },
};
