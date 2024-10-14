type novelName = string
type k = string

type ValueInterface = string | {
    [key: k]: ValueInterface
}

interface VarsInterface {
    [key: novelName]: {
        [key: k]: ValueInterface
    }
}

export const vars: VarsInterface = {
    '被侵蚀之后, 我获得了大模型系统': {
        h1: {
            name: '铃',
            honorific: '女士',
            _display: 'name',
        },
        hz: {
            name: '零号空洞',
            _display: 'name',
        }
    }
}