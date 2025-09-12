"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlumniDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_alumni_dto_1 = require("./create-alumni.dto");
class UpdateAlumniDto extends (0, mapped_types_1.PartialType)(create_alumni_dto_1.CreateAlumniDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAlumniDto = UpdateAlumniDto;
//# sourceMappingURL=update-alumni.dto.js.map