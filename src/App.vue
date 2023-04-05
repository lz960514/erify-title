<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'

import { ref, computed } from 'vue'

import { useClipboard } from '@vueuse/core'

import { ElNotification } from 'element-plus'

import { isStringSpace, trimAll } from '@/utils'

const title: Ref<string> = ref('')

const publishedStringLength: ComputedRef<number> = computed(() => title.value.length)

const publishedStringIsSpace = computed(() => isStringSpace(title.value) ? '字符串存在空格' : '字符串不存在空格')

const publishedStringNoSpace = computed(() => trimAll(title.value))

const publishedNoSpaceStringLength = computed(() => publishedStringNoSpace.value.length)

const source = ref(publishedStringNoSpace)

const { text, copy } = useClipboard({ source })

const copySource = () => {
  if (publishedStringNoSpace.value.length > 0) {
    copy()
    ElNotification({
      title: '通知',
      message: '复制成功',
      type: 'success',
    })
  } else {
    ElNotification({
      title: '通知',
      message: '复制失败，字符串不存在',
      type: 'error',
    })
  }
}
</script>

<template>
  <header>
    <h1>标题工具</h1>
  </header>
  <main>
    <div>
      <el-input v-model="title" placeholder="请输入标题" clearable>
        <template #prepend>标题:</template>
      </el-input>
    </div>
    <div>
      <el-card shadow="always">
        <span>
          字符串长度: {{ publishedStringLength }}
        </span>

        <span>
          去除空格后的字符串长度: {{ publishedNoSpaceStringLength }}
        </span>

        <span>
          字符串是否存在空格: {{ publishedStringIsSpace }}
        </span>

        <span>
          复制后的字符串: {{ text }}
        </span>
      </el-card>
    </div>
    <div>
      <el-input v-model="publishedStringNoSpace" disabled>
        <template #prepend>去除空格后的字符串:</template>
        <template #append>
          <el-button @click="copySource">复制</el-button>
        </template>
      </el-input>
    </div>
  </main>
</template>

<style scoped lang="scss">
div {
  margin: 10px 0;
}

span {
  display: block;
  margin: 10px 0;
}
</style>
