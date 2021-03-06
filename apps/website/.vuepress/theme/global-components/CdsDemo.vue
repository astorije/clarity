<template>
  <div>
    <div cds-layout="m-b:sm" v-html="code"></div>
    <div
      cds-layout="p:md"
      class="code-wrapper"
      :class="{ expanded: state }"
      v-bind:aria-expanded="state ? 'true' : 'false'"
    >
      <div class="code-actions">
        <button
          cds-layout="p:md"
          cds-text="caption uppercase"
          class="code-action"
          @click="copyCode()"
          aria-label="Copy to clipboard."
        >
          <cds-icon shape="copy-to-clipboard"></cds-icon>
        </button>
        <button
          cds-layout="p:md"
          cds-text="caption uppercase"
          class="code-action"
          @click="toggleState()"
          v-if="showToggle"
          :aria-label="'Toggle code block ' + (state ? 'closed' : 'open')"
        >
          <cds-icon v-if="!state" shape="eye"></cds-icon>
          <cds-icon v-if="state" shape="eye-hide"></cds-icon>
        </button>
      </div>
      <div
        class="code"
        v-bind:style="{ height: this.getHeight() }"
        ref="code-snippet"
        v-bind:aria-hidden="state ? 'false' : 'true'"
      >
        <pre class="core-code">
         <code v-html="prismText">{{ code }}</code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs';
import { html } from 'js-beautify';

const COLLAPSED_HEIGHT = 75;

export default {
  name: 'CdsDemo',
  props: ['code'],
  mounted: function () {
    if (this.$refs['code-snippet'].querySelector('code').offsetHeight < COLLAPSED_HEIGHT * 2) {
      this.state = true;
      this.showToggle = false;
    }
  },
  data: function () {
    return {
      showToggle: true,
      state: false,
    };
  },
  computed: {
    prismText: function () {
      return Prism.highlight(html(this.code), Prism.languages.html, 'html');
    },
  },
  methods: {
    copyCode: function () {
      navigator.clipboard.writeText(this.code);
    },
    toggleState: function () {
      this.state = !this.state;
    },
    getHeight: function () {
      if (!this.showToggle) {
        return;
      }
      if (this.state) {
        return this.$refs['code-snippet'].querySelector('pre').offsetHeight + 'px';
      } else {
        return COLLAPSED_HEIGHT + 'px';
      }
    },
  },
};
</script>

<style lang="scss">
.core-code {
  overflow-x: auto;
}
.code-wrapper {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 0.15rem;
  background-color: var(--cds-token-color-neutral-0);

  &.expanded:after {
    display: none;
  }

  &:after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.85));
    z-index: 0;

    display: block;
  }

  .code-actions {
    position: absolute;
    right: 0;
    top: 0;
    color: var(--cds-token-color-neutral-800);
    margin: 0;
    padding: 0;
    outline: none 0;
    box-shadow: none;
    background: #dedede;

    width: fit-content;
    height: fit-content;

    //border: none;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-bottom-left-radius: 0.15rem;

    z-index: 1;

    display: flex;

    .code-action {
      height: auto;
      background: none;
      border: none;
      &:hover {
        background: #ccc;
        color: inherit;
      }
      &:active {
        box-shadow: none;
      }
      padding-top: var(--cds-token-layout-space-md);
      padding-bottom: var(--cds-token-layout-space-md);
    }
  }

  .code {
    transition: height 0.3s ease-in-out;
    position: relative;
    overflow: hidden;
    pre {
      white-space: inherit;
      line-height: 1.2rem;
      margin: 0;
      padding: 0;
      border: none;
      background: none;

      code {
        // prism theme color override
        color: var(--cds-token-color-neutral-700);
      }
    }
  }
}
</style>
