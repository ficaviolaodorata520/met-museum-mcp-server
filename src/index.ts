#!/usr/bin/env node
/**
 * @fileoverview met-museum-mcp-server MCP server entry point.
 * @module index
 */

import { createApp } from '@cyanheads/mcp-ts-core';
import { metGetObject } from './mcp-server/tools/definitions/met-get-object.tool.js';
import { metListDepartments } from './mcp-server/tools/definitions/met-list-departments.tool.js';
import { metSearch } from './mcp-server/tools/definitions/met-search.tool.js';
import { initMetService } from './services/met/met-service.js';

await createApp({
  tools: [metListDepartments, metSearch, metGetObject],
  resources: [],
  prompts: [],
  instructions:
    'The Metropolitan Museum of Art Collection API — 501,731 artworks spanning 5,000 years.\n' +
    'Typical workflow: met_list_departments → met_search (returns IDs) → met_get_object (full records, up to 20 per call).\n' +
    'isPublicDomain=true guarantees CC0 open-access images; hasImages=true includes copyrighted works without usable image URLs.\n' +
    'The medium filter maps to classification categories ("Paintings", "Sculptures") — not material descriptions.',
  setup(core) {
    initMetService(core.config, core.storage);
  },
});
