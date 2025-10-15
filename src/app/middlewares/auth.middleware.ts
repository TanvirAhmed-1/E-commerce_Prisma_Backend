import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import verifyToken from "../utils/verifyToken";

type TUserRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "SELLER";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = verifyToken(authHeader);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (
      requiredRoles.length &&
      !requiredRoles.includes(user.role as TUserRole)
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: insufficient role" });
    }

    req.user = {
      id: user.id,
      email: user.email!,
      name: user.name!,
      role: user.role as TUserRole,
    };

    next();
  });
};
