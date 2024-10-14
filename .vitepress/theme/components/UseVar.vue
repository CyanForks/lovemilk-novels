<template>
    {{ value }}
</template>

<script setup lang="ts">
const props = defineProps<{
    p: string,
}>()

import { vars } from '../vars';
import { useRoute } from 'vitepress';

const route = useRoute()
const novelName = route.data.relativePath.split('/', 1)[0]
if (typeof props.p !== 'string') {
    throw TypeError('prop.p must be provided and be a string')
}
const p = props.p.toLocaleLowerCase()

const obj = vars[novelName]
if (!obj) {
    throw TypeError(`novel \`${novelName}\` was not found`)
}

/**
 * 获取字符串中指定字符连续出现的次数
 * @param str 被查找的字符串
 * @param target 要查找的字符 (必须为单个字符)
 * @param [ignoreStart=true] 字符串开头不以 target 字符开头时, 是否直接返回 0 (为 false 时直接返回)
 */
function getContinuous(str: string, target: string, ignoreStart: boolean = true) {
    if (!ignoreStart && !str.startsWith(target)) {
        return 0
    }

    let count = 0
    for (const char of str) {
        if (count > 0) {
            if (char !== target) {
                return count
            }

            count++
        } else {
            count += char === target ? 1 : 0
        }
    }

    return count
}

function splitPath(path: string): string[] {
    path = path.trim().replaceAll('\\', '/')
    return path.split('/').filter(str => str.trim().length)
}

function calculatePath(path: string | string[], current?: string | string[]): string[] {
    path = Array.isArray(path) ? path : splitPath(path)
    current = Array.isArray(current) ? current : current ? splitPath(current) : []

    const merged: Array<string | undefined> = [...current, ...path]
    const result: string[] = []

    for (let i = 0; i < merged.length; i++) {
        const part = merged[i]
        if (part === undefined || part === '.') {
            continue
        }

        if (part.startsWith('..')) {
            if (getContinuous(part, '.') > 2) {
                throw new Error('invalid path')
            }

            if (result.length <= 0) {
                throw new Error('no parent path')
            }
            result.pop()
        } else {
            result.push(part)
        }
    }

    return result
}

function getValue(obj: any, path: string | string[]): string | undefined {
    path = Array.isArray(path) ? path : splitPath(path)

    let value = obj

    for (const key of path) {
        value = value?.[key]
        if (!value) {
            return value
        }
    }

    if (typeof value !== 'string') {
        if (!value?._display) {
            throw TypeError(`cannot display \`${typeof value}\` type, did you forget to set the \`_display\` property?`)
        }

        const defaultPath = calculatePath(value?._display, path)
        value = getValue(obj, defaultPath) ?? value
    }

    return value
}

const path = calculatePath(p)

const value = getValue(obj, path)
if (typeof value === 'undefined') {
    throw TypeError(`undefined value path \`${path.join('/')}\``)
}
</script>
