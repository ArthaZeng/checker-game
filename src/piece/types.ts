import type { ReactNode } from 'react'

import type { PieceColor } from '../common/enums'

export type PieceProps = {
    color: PieceColor;
    children?: ReactNode;
}