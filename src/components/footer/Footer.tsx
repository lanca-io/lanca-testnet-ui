import type { FC } from "react";
import { IconButton } from "@concero/ui-kit";
import "./Footer.pcss";


export const Footer: FC = (): JSX.Element => {
    return (
        <div className="footer">
            <div className="footer-item">
                <h5 className="footer-item__heading">Docs</h5>
                <div className="footer-item__actions">
                    <IconButton variant="secondary"/>
                    <IconButton variant="secondary"/>
                </div>
            </div>
            <div className="footer-item">
                <h5 className="footer-item__heading">Docs</h5>
                <div className="footer-item__actions">
                    <IconButton variant="secondary"/>
                    <IconButton variant="secondary"/>
                </div>
            </div>
            <div className="footer-item">
                <h5 className="footer-item__heading">Docs</h5>
                <div className="footer-item__actions">
                    <IconButton variant="secondary"/>
                    <IconButton variant="secondary"/>
                    <IconButton variant="secondary"/>
                </div>
            </div>
        </div>
    )
}


